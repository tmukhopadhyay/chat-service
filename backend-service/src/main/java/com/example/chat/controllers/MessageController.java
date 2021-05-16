package com.example.chat.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.chat.dto.MessageDto;
import com.example.chat.models.Message;

@Controller
public class MessageController {

	@MessageMapping("/chat")
	@SendTo("/topic/messages")
	public Message sendMessage(@Payload MessageDto messageDto) {
	    return new Message(messageDto.getName(), messageDto.getText(), LocalDateTime.now());
	}

	@MessageExceptionHandler
	@SendTo("/queue/errors")
	public String handleException(Throwable exception) {
		return exception.getMessage();
	}
}
