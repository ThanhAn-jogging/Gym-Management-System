package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "DANGKY_LOPHOC")
@IdClass(DangKyLopHoc.DangKyLopHocId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DangKyLopHoc {

    @Id
    @Column(name = "MAHV")
    private String maHV;

    @Id
    @Column(name = "MALOP")
    private String maLop;

    @Column(name = "NGAYDANGKY")
    private LocalDateTime ngayDangKy;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DangKyLopHocId implements Serializable {
        private String maHV;
        private String maLop;
    }
}