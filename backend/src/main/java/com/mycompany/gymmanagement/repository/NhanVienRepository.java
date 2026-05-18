package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, String> {

    List<NhanVien> findByChucVu(String chucVu);

    @Procedure(procedureName = "SP_THEM_NHANVIEN")
    void themNhanVienMoi(String p_HoTen, String p_ChucVu, String p_Sdt, Double p_LuongCB, LocalDate p_NgayVaoLam);

    @Procedure(procedureName = "SP_CAPNHAT_NHANVIEN")
    void capNhatNhanVienPro(String p_MaNV, String p_HoTen, String p_ChucVu, String p_Sdt, Double p_LuongCB, LocalDate p_NgayVaoLam);

    @Procedure(procedureName = "SP_XOA_NHANVIEN")
    void xoaNhanVienPro(String p_MaNV);
}