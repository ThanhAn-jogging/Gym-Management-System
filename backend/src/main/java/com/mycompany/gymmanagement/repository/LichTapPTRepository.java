package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.LichTapPT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface LichTapPTRepository extends JpaRepository<LichTapPT, String> {

    // Gọi đúng tên Procedure lúc nãy và BỎ p_MaLich đi (vì Trigger lo rồi)
    @Procedure(procedureName = "SP_DAT_LICH_PT")
    void dangKyLichTap(
        @Param("p_MaHV") String p_MaHV, 
        @Param("p_MaPT") String p_MaPT, 
        @Param("p_NgayTap") LocalDate p_NgayTap, 
        @Param("p_KhungGio") String p_KhungGio
    );

    @Procedure(procedureName = "SP_HUY_LICHTAP_PT")
    void huyLichTap(@Param("p_MaLich") String p_MaLich);
}