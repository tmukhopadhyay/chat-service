package com.example.chat.aspects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Configuration
public class LoggingAspects {

	@Pointcut("execution(* com.example.chat.config.*.*(..))")
	private void configurations() {
		// This method defines the pointcut for the configurations
	}

	@Before(value = "configurations()")
	public void logBeforeConfigurations(JoinPoint joinPoint) {
		Signature signature = joinPoint.getSignature();
		log.info("Initializing: [{}.{}]", signature.getDeclaringType().getSimpleName(), signature.getName());
	}

	@Pointcut("execution(* com.example.chat.controllers.*.*(..))")
	private void controllers() {
		// This method defines the pointcut for the controllers
	}

	@Before(value = "controllers()")
	public void logBeforeControllers(JoinPoint joinPoint) {
		Signature signature = joinPoint.getSignature();
		String params = new ArrayList<>(Arrays.asList(joinPoint.getArgs())).stream().map(String::valueOf).collect(Collectors.joining(", "));
		log.info("Entering [{}.{}] with arguments [{}]", signature.getDeclaringType().getSimpleName(), signature.getName(), params);
	}

	@AfterReturning(value = "controllers()")
	public void logAfterControllersReturning(JoinPoint joinPoint) {
		Signature signature = joinPoint.getSignature();
		log.info("Exiting: [{}.{}]", signature.getDeclaringType().getSimpleName(), signature.getName());
	}

	@AfterThrowing(value = "controllers()", throwing = "ex")
	public void logAfterMethodsThrowing(JoinPoint joinPoint, Exception ex) {
		log.error(ex.getMessage(), ex.getCause());
	}
}
