package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "HOADON")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDon {
    @Id
    @Column(name = "MAHD")
    private String maHD;

    @Column(name = "MAHV")
    private String maHV;

    @Column(name = "MANV")
    private String maNV;

    @Column(name = "NGAYLAP")
    private LocalDate ngayLap;

    @Column(name = "TONGTIEN")
    private Double tongTien;

    @Column(name = "MAVOUCHER")
    private String maVoucher;

    @Column(name = "PHUONGTHUCTT")
    private String phuongThucTT;

    @Column(name = "TRANGTHAIHD")
    private String trangThaiHD;

    // Trong file HoaDon.java, thêm thuộc tính này:
    @Column(name = "MAGOI")
    private String maGoi;
}