package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "BAOTRI")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaoTri {
    @Id
    @Column(name = "MAPHIEUBT")
    private String maPhieuBT;

    @Column(name = "MATB")
    private String maTB;

    @Column(name = "NGAYBAOTRI")
    private LocalDate ngayBaoTri;

    @Column(name = "NOIDUNG")
    private String noiDung;

    @Column(name = "CHIPHI")
    private Double chiPhi;
}