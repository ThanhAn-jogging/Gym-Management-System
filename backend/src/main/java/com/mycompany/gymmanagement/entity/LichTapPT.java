package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "LICHTAP_PT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichTapPT {
    @Id
    @Column(name = "MALICH")
    private String maLich;

    @Column(name = "MAHV")
    private String maHV;

    @Column(name = "MAPT")
    private String maPT;

    @Column(name = "NGAYTAP")
    private LocalDate ngayTap;

    @Column(name = "KHUNGGIO")
    private String khungGio;

    @Column(name = "TRANGTHAIBUOITAP")
    private String trangThaiBuoiTap;
}