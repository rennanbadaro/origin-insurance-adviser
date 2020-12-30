resource "aws_ecs_service" "app" {
  name                              = local.ecs_application_name
  cluster                           = data.aws_ecs_cluster.cluster.arn
  iam_role                          = aws_iam_role.ecs_tasks_execution_role.arn
  task_definition                   = aws_ecs_task_definition.task_definition.arn
  desired_count                     = var.ecs_desired_count
  launch_type                       = "EC2"
  health_check_grace_period_seconds = var.health_check_grace_period_seconds
  depends_on = [
    aws_alb.app_alb_load_balancer,
    aws_iam_role_policy_attachment.ecs_tasks_execution_role,
  ]

  load_balancer {
    target_group_arn = aws_alb_target_group.app_target_group.arn
    container_port   = 3000
    container_name   = local.ecs_application_name
  }
}
