package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, String> {

    @Procedure(procedureName = "SP_CHECKIN_HOIVIEN")
    void thucHienCheckIn(String p_MaCheckIn, String p_MaHV, String p_MaDK);

    @Procedure(procedureName = "SP_CHECKOUT_HOIVIEN")
    void thucHienCheckOut(String p_MaCheckIn);
}