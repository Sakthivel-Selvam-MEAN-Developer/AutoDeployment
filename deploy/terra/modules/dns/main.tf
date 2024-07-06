terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    gandi = {
      version = "2.3.0"
      source   = "go-gandi/gandi"
    }
  }
  required_version = ">= 1.2.0"
  backend "local" {}
}

provider "aws" {
  region  = "us-east-1"
}

variable "instance_type" {
  description = "What kind of servers to run (e.g. t2.large)"
  default     = "t4g.micro"
}

import {
  to = aws_vpc.main
  id = "vpc-08b28f125cf790d28"
}

resource "aws_vpc" "main" {
  cidr_block = "172.31.0.0/16"
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

// create a elastic ip and associate it with the instance

resource "aws_eip" "ip" {
  instance = aws_instance.app_server.id
  vpc      = true
}
output "public_ip" {
  value = aws_eip.ip.public_ip
}

# provider "gandi" {}

# //add a dns record in gandi
# resource "gandi_livedns_record" "magnum" {
#   name = "@"
#   type = "A"
#   values = [aws_eip.ip.public_ip]
#   ttl = 300
#   zone    = "wondermove.in"
# }
#
# resource "gandi_livedns_record" "auth" {
#   name = "auth"
#   type = "A"
#   values = [aws_eip.ip.public_ip]
#   ttl = 300
#   zone    = "wondermove.in"
# }
