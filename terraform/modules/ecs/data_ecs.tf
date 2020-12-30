data "aws_ecs_cluster" "cluster" {
    cluster_name = var.app_env
}
