package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "HUANLUYENVIEN")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HuanLuyenVien {
    
    @Id
    @Column(name = "MAPT")
    private String maPT;

    @Column(name = "MANV_LIENKET")
    private String maNV;

    @Formula("(SELECT n.HOTEN FROM NHANVIEN n WHERE n.MANV = MANV_LIENKET)")
    private String hoTen;

    @Column(name = "CHUYENMON")
    private String chuyenMon;

    @Column(name = "BANGCAP") 
    private String bangCap;

    @Column(name = "KINHNGHIEM")
    private Integer kinhNghiem;

    @Column(name = "RATING")
    private Double rating;
    
}