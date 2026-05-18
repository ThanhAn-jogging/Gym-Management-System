package com.mycompany.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "BAOLUU")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaoLuu {
    @Id
    @Column(name = "MABAOLUU")
    private String maBaoLuu;

    @Column(name = "MADK")
    private String maDK;

    @Column(name = "NGAYBATDAUNGHI")
    private LocalDate ngayBatDauNghi;

    @Column(name = "NGAYKETTHUCNGHI")
    private LocalDate ngayKetThucNghi;

    @Column(name = "LYDO")
    private String lyDo;
}