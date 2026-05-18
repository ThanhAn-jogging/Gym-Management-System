package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "NHANVIEN")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
    @Id
    @Column(name = "MANV")
    private String maNV;

    @Column(name = "HOTEN", nullable = false)
    private String hoTen;

    @Column(name = "NGAYSINH")
    private LocalDate ngaySinh;

    @Column(name = "GIOITINH")
    private String gioiTinh;

    @Column(name = "SDT")
    private String sdt;

    @Column(name = "DIACHI")
    private String diaChi;

    @Column(name = "CHUCVU")
    private String chucVu;

    @Column(name = "LUONGCB")
    private Double luongCB;

    @Column(name = "NGAYVAOLAM")
    private LocalDate ngayVaoLam;
}