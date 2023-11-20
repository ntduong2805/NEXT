package com.ntduong.next.dto.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChatMessage {
    private String content;
    private Long senderId;

    /**
     * @0: CHAT
     * @1: JOIN
     * @2: LEAVE
     */
    private Long type;

}
