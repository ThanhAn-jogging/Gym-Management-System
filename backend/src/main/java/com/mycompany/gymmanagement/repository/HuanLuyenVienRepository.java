package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.HuanLuyenVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface HuanLuyenVienRepository extends JpaRepository<HuanLuyenVien, String> {

    @Procedure(procedureName = "SP_THEM_HLV")
    void themHLVMoi(String p_MaPT, String p_MaNV, String p_ChuyenMon, String p_BangCap, 
                    Integer p_KinhNghiem, Double p_Rating);

    @Procedure(procedureName = "SP_CAPNHAT_HLV")
    void capNhatHLVPro(String p_MaPT, String p_MaNV, String p_ChuyenMon, String p_BangCap, 
                       Integer p_KinhNghiem, Double p_Rating);

    @Procedure(procedureName = "SP_XOA_HLV")
    void xoaHLVPro(String p_MaPT);
}