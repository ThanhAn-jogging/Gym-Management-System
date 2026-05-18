package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "CHECKIN")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckIn {
    @Id
    @Column(name = "MACHECKIN")
    private String maCheckIn;

    @Column(name = "MAHV")
    private String maHV;

    @Column(name = "MADK")
    private String maDK;

    @Column(name = "THOIGIANVAO")
    private LocalDateTime thoiGianVao;

    @Column(name = "THOIGIANRA")
    private LocalDateTime thoiGianRa;

    @Column(name = "GHICHU")
    private String ghiChu;
}