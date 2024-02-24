terraform {
  #use local folder as source
  source="../../modules/app/main.tf"
}

inputs  = {
  instance_type = "t4g.nano"
}

remote_state {
  backend = "local"
  config = {
    path = "${get_parent_terragrunt_dir()}/${path_relative_to_include()}/terraform.tfstate"
  }
}




