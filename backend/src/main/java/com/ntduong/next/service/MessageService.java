package com.ntduong.next.service;

import com.ntduong.next.dto.message.MessageResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    public List<MessageResDto> getMessagesBySenderId(Long senderId);
    public List<MessageResDto> getMessagesByReceiverId(String receiverId);
    public MessageResDto saveMessage(MessageResDto message);
}
