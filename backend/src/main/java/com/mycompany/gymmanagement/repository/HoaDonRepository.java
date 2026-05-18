package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    @Procedure(procedureName = "SP_TAO_HOADON")
    void taoHoaDonMoi(
        String p_MaHD, 
        String p_MaHV, 
        String p_MaGoi,   
        String p_MaVoucher,  
        Double p_TongTienGoc
    );
    
    @Procedure(procedureName = "SP_THONGKE_DOANHTHU_THANG")
    Double thongKeDoanhThuThang(Integer p_Thang, Integer p_Nam);
}