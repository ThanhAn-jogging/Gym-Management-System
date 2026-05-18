package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "DANGKY_GOITAP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DangKyGoiTap {
    @Id
    @Column(name = "MADK")
    private String maDK;

    @Column(name = "MAHV")
    private String maHV;

    @Column(name = "MAGOI")
    private String maGoi;

    @Column(name = "NGAYBATDAU")
    private LocalDate ngayBatDau;

    @Column(name = "NGAYKETTHUC")
    private LocalDate ngayKetThuc;

    @Column(name = "MAHD")
    private String maHD;

    @Column(name = "TRANGTHAI")
    private String trangThai;
}