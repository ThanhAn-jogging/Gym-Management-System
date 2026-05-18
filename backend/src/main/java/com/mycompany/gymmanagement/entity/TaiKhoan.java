package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TAIKHOAN")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaiKhoan {
    @Id
    @Column(name = "TENDN")
    private String tenDN;

    @Column(name = "MATKHAU", nullable = false)
    private String matKhau;

    @Column(name = "QUYENTRUYCAP")
    private String quyenTruyCap;

    @Column(name = "MANV")
    private String maNV;

    @Column(name = "MAPT")
    private String maPT;

    @Column(name = "TRANGTHAI")
    private String trangThai;
}