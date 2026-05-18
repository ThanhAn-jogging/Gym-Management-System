package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "HOIVIEN")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoiVien {
    @Id
    @Column(name = "MAHV")
    private String maHV;

    @Column(name = "HOTEN", nullable = false)
    private String hoTen;

    @Column(name = "GIOITINH")
    private String gioiTinh;

    @Column(name = "NGAYSINH")
    private LocalDate ngaySinh;

    @Column(name = "SDT")
    private String sdt;

    @Column(name = "DIACHI")
    private String diaChi;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "TINHTRANGSK")
    private String tinhTrangSK;

    @Column(name = "NGAYDANGKY")
    private LocalDate ngayDangKy;

    @Column(name = "HANGTV")
    private String hangTV;

    @Column(name = "TONGCHITIEU")
    private Double tongChiTieu;
}