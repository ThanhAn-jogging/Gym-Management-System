package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "THIETBI")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThietBi {
    @Id
    @Column(name = "MATB")
    private String maTB;

    @Column(name = "TENTB", nullable = false)
    private String tenTB;

    @Column(name = "LOAIMAY")
    private String loaiMay;

    @Column(name = "NGAYMUA")
    private LocalDate ngayMua;

    @Column(name = "TINHTRANG")
    private String tinhTrang;

    @Column(name = "VITRI")
    private String viTri;
}