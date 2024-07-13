terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "local" {}
}

provider "aws" {
  region  = "us-east-1"
}
resource "aws_vpc" "main" {
  cidr_block = "172.32.0.0/16"
  tags = {
    Name = "wonderwhy"
  }
}

resource "aws_subnet" "application" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "172.32.1.0/24"
}
resource "aws_subnet" "db" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "172.32.2.0/24"
  availability_zone = "us-east-1a"
}
resource "aws_subnet" "db2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "172.32.3.0/24"
  availability_zone = "us-east-1b"
}
resource "aws_security_group" "application" {
  vpc_id = aws_vpc.main.id
  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}
resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}
resource "aws_route_table_association" "rta" {
  subnet_id = aws_subnet.application.id
  route_table_id = aws_route_table.rt.id
}
resource "aws_instance" "test_server" {
  instance_type = "t2.nano"
  ami = "ami-0b72821e2f351e396"
  user_data = <<-EOL
    set -e
    sudo yum update
    sudo yum install -y docker
    curl -SL https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-linux-aarch64 -o ~/docker-compose
    chmod +x ~/docker-compose
    ~/docker-compose version
    echo "install docker complete"
    sudo systemctl enable docker.service
    sudo systemctl start docker.service
    echo "set docker auto start"
    sudo chmod 666 /var/run/docker.sock
  EOL
  tags = {
    Name = "Test Server"
  }
  # key_name = "wonderwhytest"
  root_block_device {
    volume_size = 20
  }
  subnet_id = aws_subnet.application.id
  vpc_security_group_ids = [aws_security_group.application.id]

}
resource "aws_security_group" "db_security_group" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust this as per your requirements
  }
  tags = {
    Name = "db-security-group"
  }
}
resource "aws_db_subnet_group" "db_subnet" {
  name       = "db_subnet_group"
  subnet_ids = [aws_subnet.db.id, aws_subnet.db2.id]

  tags = {
    Name = "DB_Subnet"
  }
}
resource "aws_db_instance" "wonderwhy_rds" {
  allocated_storage    = 10
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.3"
  instance_class       = "db.t3.micro"
  username             = "postgres"
  password             = "cat-went-for-a-walk"
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true

  db_subnet_group_name = aws_db_subnet_group.db_subnet.name
  vpc_security_group_ids = [aws_security_group.db_security_group.id]
  tags = {
    Name = "RDS DB"
  }
}

resource "aws_eip" "ip" {
  instance = aws_instance.test_server.id
  domain = "vpc"
}

output "public_ip" {
  value = aws_eip.ip.private_ip
}

# resource "aws_instance" "app_server" {
#   ami           = "ami-0bbebc09f0a12d4d9"
#   instance_type =  var.instance_type
#   tags = {
#     Name = "wonder why server"
#   }
#   key_name = "wonderwhy"
#   root_block_device {
#     volume_size = 20
#     delete_on_termination = true
#   }
#   vpc_security_group_ids = ["sg-00257a8ff4fef413c"]
# }
#
# // create a elastic ip and associate it with the instance
#
# resource "aws_eip" "ip" {
#   instance = aws_instance.app_server.id
#   vpc      = true
# }
# output "public_ip" {
#   value = aws_eip.ip.public_ip
# }
