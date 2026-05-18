package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "LOPHOC")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LopHoc {
    @Id
    @Column(name = "MALOP")
    private String maLop;

    @Column(name = "TENLOP")
    private String tenLop;

    @Column(name = "MAPT")
    private String maPT;

    @Column(name = "MOTA")
    private String moTa;

    @Column(name = "SOLUONGTOIDA")
    private Integer soLuongToiDa;

    @Column(name = "SOLUONGHIENTAI")
    private Integer soLuongHienTai;

    @Column(name = "NGAYTAP")
    private String ngayTap;

    @Column(name = "KHUNGGIO")
    private String khungGio;

    @Column(name = "LOAILOP")
    private String loaiLop;
}