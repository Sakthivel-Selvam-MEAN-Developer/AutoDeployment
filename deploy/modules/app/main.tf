terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  backend "local" {
    path = "terraform.tfstate"
  }
  required_version = ">= 1.2.0"
}

#timeouts {
#  create = "60m"
#  delete = "60m"
#  update = "60m"
#}

provider "aws" {
  region  = "us-east-1"
}

variable "instance_type" {
  description = "What kind of servers to run (e.g. t2.large)"
  default     = "t4g.nano"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0bbebc09f0a12d4d9"
  instance_type =  var.instance_type
#  security_groups = ["sg-00257a8ff4fef413c"]
  tags = {
    Name = "wonder why server"
  }
  key_name = "wonderwhy"
  root_block_device {
    volume_size = 20
    delete_on_termination = true
  }
  vpc_security_group_ids = ["sg-00257a8ff4fef413c"]
}


