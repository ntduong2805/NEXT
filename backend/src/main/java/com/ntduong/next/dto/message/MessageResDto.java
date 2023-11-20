package com.ntduong.next.dto.message;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MessageResDto {
    private Long messageId;
    private Long senderId;
    private String receiverId;
    private String message;
    private String date;
}
