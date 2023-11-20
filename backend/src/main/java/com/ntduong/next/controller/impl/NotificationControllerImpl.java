package com.ntduong.next.controller.impl;

import com.ntduong.next.controller.NotificationController;

import javax.management.Notification;

public class NotificationControllerImpl implements NotificationController {
    @Override
    public Notification sendNotification(Notification notification) {
        return notification;
    }
}
