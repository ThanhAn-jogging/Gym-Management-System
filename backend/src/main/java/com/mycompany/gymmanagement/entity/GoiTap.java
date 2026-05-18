package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "GOITAP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoiTap {

    @Id
    @Column(name = "MAGOI")
    private String maGoi;

    @Column(name = "TENGOI", nullable = false)
    private String tenGoi;

    @Column(name = "DONGIA")
    private Double donGia; 

    @Column(name = "THOIGIANHIEULUC")
    private Integer thoiGianHieuLuc;

    @Column(name = "MOTA")
    private String moTa;

    @Column(name = "QUYENGOITAP")
    private String quyenGoiTap;

    @Formula("(SELECT COUNT(*) FROM DANGKY_GOITAP d WHERE d.MAGOI = MAGOI)")
    private Integer luotDangKy;
}