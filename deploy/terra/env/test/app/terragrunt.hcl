terraform {
  source="../../../modules/app"
}

inputs  = {
  instance_type = "t2.micro"
}

remote_state {
  backend = "local"
  config = {
    path = "${get_parent_terragrunt_dir()}/${path_relative_to_include()}/terraform.tfstate"
  }
}