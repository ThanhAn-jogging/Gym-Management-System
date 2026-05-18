package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.GoiTap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface GoiTapRepository extends JpaRepository<GoiTap, String> {

    @Procedure(procedureName = "SP_THEM_GOITAP")
    void themGoiTapPro(String p_TenGoi, Double p_DonGia, Integer p_ThoiGianHieuLuc, String p_MoTa, String p_QuyenGoiTap);

    @Procedure(procedureName = "SP_CAPNHAT_GOITAP")
    void capNhatGoiTapPro(String p_MaGoi, String p_TenGoi, Double p_DonGia, Integer p_ThoiGianHieuLuc, String p_MoTa, String p_QuyenGoiTap);

    @Procedure(procedureName = "SP_XOA_GOITAP")
    void xoaGoiTapPro(String p_MaGoi);
}