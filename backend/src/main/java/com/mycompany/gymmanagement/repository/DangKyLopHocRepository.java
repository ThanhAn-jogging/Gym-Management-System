package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.DangKyLopHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DangKyLopHocRepository extends JpaRepository<DangKyLopHoc, String> {
    
    @Procedure(procedureName = "SP_DANGKY_LOPHOC")
    void dangKyLop(@Param("p_MaHV") String p_MaHV, @Param("p_MaLop") String p_MaLop);

    @Procedure(procedureName = "SP_HUY_DANGKY_LOPHOC")
    void huyDangKyLop(@Param("p_MaHV") String p_MaHV, @Param("p_MaLop") String p_MaLop);
}