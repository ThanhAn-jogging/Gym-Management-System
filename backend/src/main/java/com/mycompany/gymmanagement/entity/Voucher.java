package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "VOUCHER")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {
    @Id
    @Column(name = "MAVOUCHER")
    private String maVoucher;

    @Column(name = "TENVOUCHER")
    private String tenVoucher;

    @Column(name = "LOAIVOUCHER")
    private String loaiVoucher;

    @Column(name = "PHANTRAMGIAM")
    private Double phanTramGiam;

    @Column(name = "GIATRITOITHIEU")
    private Double giaTriToiThieu;

    @Column(name = "NGAYHETHAN")
    private LocalDate ngayHetHan;
}