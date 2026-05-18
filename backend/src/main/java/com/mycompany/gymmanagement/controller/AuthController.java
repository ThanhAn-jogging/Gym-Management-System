package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.TaiKhoan;
import com.mycompany.gymmanagement.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String usernameOrEmail = loginData.get("usernameOrEmail");
        String password = loginData.get("password");

        try {
            Optional<TaiKhoan> accountOpt = taiKhoanRepository.findById(usernameOrEmail);

            if (accountOpt.isPresent()) {
                TaiKhoan account = accountOpt.get();
                
                if (account.getMatKhau().equals(password)) {
                    return ResponseEntity.ok(Map.of(
                            "message", "Đăng nhập thành công!",
                            "tenDN", account.getTenDN(),
                            "quyen", account.getQuyenTruyCap() != null ? account.getQuyenTruyCap() : "USER"
                    ));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Sai mật khẩu"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Tài khoản không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Lỗi server: " + e.getMessage()));
        }
    }
}