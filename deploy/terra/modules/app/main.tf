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
  cidr_block = "192.168.0.0/16"
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
