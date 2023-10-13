package com.ntduong.next.util;

import java.util.Calendar;
import java.util.Date;

public class CommonDateUtil {
    /**
     * getSystemDateTime.
     *
     * @return Date
     * @author DuongNT
     */
    public static Date getSystemDateTime() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTime();
    }
}
