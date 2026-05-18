package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.TaiKhoan;
import com.mycompany.gymmanagement.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaiKhoanService {
    private final TaiKhoanRepository taiKhoanRepository;

    public List<TaiKhoan> layTatCaTaiKhoan() {
        return taiKhoanRepository.findAll();
    }

    @Transactional
    public void themTaiKhoan(TaiKhoan tk) {
        taiKhoanRepository.themTaiKhoanPro(
            tk.getTenDN(), tk.getMatKhau(), tk.getQuyenTruyCap(), 
            tk.getMaNV(), tk.getMaPT(), tk.getTrangThai()
        );
    }

    @Transactional
    public void capNhatTaiKhoan(String tenDN, TaiKhoan tk) {
        taiKhoanRepository.capNhatTaiKhoanPro(
            tenDN, tk.getMatKhau(), tk.getQuyenTruyCap(), 
            tk.getMaNV(), tk.getMaPT(), tk.getTrangThai()
        );
    }

    @Transactional
    public void xoaTaiKhoan(String tenDN) {
        taiKhoanRepository.xoaTaiKhoanPro(tenDN);
    }

    // Hàm xử lý logic đăng nhập
    public TaiKhoan dangNhap(String tenDN, String matKhau) {
        // 1. Kiểm tra tài khoản có tồn tại không
        TaiKhoan tk = taiKhoanRepository.findById(tenDN)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại!"));

        // 2. Kiểm tra mật khẩu
        if (!tk.getMatKhau().equals(matKhau)) {
            throw new RuntimeException("Sai mật khẩu!");
        }

        // 3. Chặn đăng nhập nếu tài khoản không ở trạng thái Hoạt động (Đã khóa)
        if (tk.getTrangThai() == null || !tk.getTrangThai().equals("Hoạt động")) {
            throw new RuntimeException("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên!");
        }

        // Vượt qua hết thì cho phép đăng nhập thành công
        return tk;
    }
}