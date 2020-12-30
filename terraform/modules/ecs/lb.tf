resource "aws_alb" "app_alb_load_balancer" {
  name            = format("%s-app-alb-load-balancer", var.app_env)
  security_groups = [aws_security_group.app_public_sg.id]
  subnets         = [aws_subnet.app_public_sn_01.id, aws_subnet.app_public_sn_02.id]
}

resource "aws_alb_target_group" "app_target_group" {
  name     = format("%s-app-target-group", var.app_env)
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.app_vpc.id

  health_check {
    healthy_threshold   = "2"
    unhealthy_threshold = "6"
    interval            = "30"
    matcher             = "200"
    path                = "/"
    protocol            = "HTTP"
    timeout             = "5"
  }

  stickiness {
    type = "lb_cookie"
  }
}

resource "aws_alb_listener" "alb-listener" {
  load_balancer_arn = aws_alb.app_alb_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.app_target_group.arn
    type             = "forward"
  }
}

