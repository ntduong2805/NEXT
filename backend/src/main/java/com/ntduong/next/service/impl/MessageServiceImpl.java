package com.ntduong.next.service.impl;

import com.ntduong.next.dto.message.MessageResDto;
import com.ntduong.next.repository.MessageRepository;
import com.ntduong.next.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public List<MessageResDto> getMessagesBySenderId(Long senderId) {
        return null;
    }

    @Override
    public List<MessageResDto> getMessagesByReceiverId(String receiverId) {
        return null;
    }

    @Override
    public MessageResDto saveMessage(MessageResDto message) {
        return null;
    }
}
