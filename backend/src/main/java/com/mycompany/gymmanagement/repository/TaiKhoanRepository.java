package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {

    @Procedure(procedureName = "SP_THEM_TAIKHOAN")
    void themTaiKhoanPro(String p_TenDN, String p_MatKhau, String p_QuyenTruyCap, String p_MaNV, String p_MaPT, String p_TrangThai);

    @Procedure(procedureName = "SP_CAPNHAT_TAIKHOAN")
    void capNhatTaiKhoanPro(String p_TenDN, String p_MatKhau, String p_QuyenTruyCap, String p_MaNV, String p_MaPT, String p_TrangThai);

    @Procedure(procedureName = "SP_XOA_TAIKHOAN")
    void xoaTaiKhoanPro(String p_TenDN);
}