package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.BaoLuu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface BaoLuuRepository extends JpaRepository<BaoLuu, String> {
    @Procedure(procedureName = "SP_THEM_BAOLUU")
    void themBaoLuu(@Param("p_MaDK") String p_MaDK, @Param("p_NgayBatDau") LocalDate p_NgayBatDau, @Param("p_NgayKetThuc") LocalDate p_NgayKetThuc, @Param("p_LyDo") String p_LyDo);

    @Procedure(procedureName = "SP_SUA_BAOLUU")
    void suaBaoLuu(@Param("p_MaBaoLuu") String p_MaBaoLuu, @Param("p_MaDK") String p_MaDK, @Param("p_NgayBatDau") LocalDate p_NgayBatDau, @Param("p_NgayKetThuc") LocalDate p_NgayKetThuc, @Param("p_LyDo") String p_LyDo);

    @Procedure(procedureName = "SP_XOA_BAOLUU")
    void xoaBaoLuu(@Param("p_MaBaoLuu") String p_MaBaoLuu);
}