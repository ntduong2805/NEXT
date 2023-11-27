package com.ntduong.next.entity;

import java.util.List;

public class LocationEntity {

    { label: , value: "Châu Thành", latlng: [10.2322, 105.1131], region: "An Giang" },
    { label: "Châu Phú", value: "Châu Phú", latlng: [10.3603, 105.3384], region: "An Giang" },
    { label: "Thoại Sơn", value: "Thoại Sơn", latlng: [10.1175, 105.1398], region: "An Giang" },
    { label: "Chợ Mới", value: "Chợ Mới", latlng: [10.2511, 105.0352], region: "An Giang" },
    { label: "Phú Tân", value: "Phú Tân", latlng: [10.3186, 105.1051], region: "An Giang" }
    private Long locationId;
    private String label;
    private String value;
    private List<Double> latlng;
    private String region;

    public LocationEntity(Long locationId, String label, String value, List<Double> latlng, String region) {
        this.locationId = locationId;
        this.label = label;
        this.value = value;
        this.latlng = latlng;
        this.region = region;
    }
}
