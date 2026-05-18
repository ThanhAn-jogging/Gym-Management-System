package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.LopHoc;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LopHocRepository extends JpaRepository<LopHoc, String> {

    @Procedure(procedureName = "SP_THEM_LOPHOC")
    void themLopHocPro(String p_TenLop, String p_MaPT, String p_MoTa, Integer p_SoLuongToiDa, String p_NgayTap, String p_KhungGio, String p_LoaiLop);

    @Procedure(procedureName = "SP_CAPNHAT_LOPHOC")
    void capNhatLopHocPro(String p_MaLop, String p_TenLop, String p_MaPT, String p_MoTa, Integer p_SoLuongToiDa, String p_NgayTap, String p_KhungGio, String p_LoaiLop);

    @Procedure(procedureName = "SP_XOA_LOPHOC")
    void xoaLopHocPro(String p_MaLop);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT l FROM LopHoc l WHERE l.maLop = :maLop")
    Optional<LopHoc> findByIdForUpdate(@Param("maLop") String maLop);
}