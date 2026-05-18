package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.HoiVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface HoiVienRepository extends JpaRepository<HoiVien, String> {
    
    @Procedure(procedureName = "SP_THEM_HOIVIEN")
    void themHoiVienMoi(String p_MaHV, String p_HoTen, String p_GioiTinh, LocalDate p_NgaySinh, 
                        String p_Sdt, String p_DiaChi, String p_Email, String p_TinhTrangSK);

    @Procedure(procedureName = "SP_CAPNHAT_HOIVIEN")
    void capNhatHoiVienPro(String p_MaHV, String p_HoTen, String p_GioiTinh, 
                           String p_Sdt, String p_DiaChi, String p_Email, String p_TinhTrangSK);

    @Procedure(procedureName = "SP_XOA_HOIVIEN")
    void xoaHoiVienPro(String p_MaHV);
}