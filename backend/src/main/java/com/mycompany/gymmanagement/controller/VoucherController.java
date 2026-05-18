package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.Voucher;
import com.mycompany.gymmanagement.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/voucher")
@CrossOrigin("*")
@RequiredArgsConstructor
public class VoucherController {
    private final VoucherService voucherService;

    @GetMapping
    public ResponseEntity<List<Voucher>> layTatCa() {
        return ResponseEntity.ok(voucherService.layTatCaVoucher());
    }

    @PostMapping
    public ResponseEntity<String> themVoucher(@RequestBody Voucher v) {
        try {
            voucherService.themVoucherMoi(v);
            return ResponseEntity.ok("Tạo Voucher thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatVoucher(@PathVariable String id, @RequestBody Voucher v) {
        try {
            voucherService.capNhatVoucher(id, v);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaVoucher(@PathVariable String id) {
        try {
            voucherService.xoaVoucher(id);
            return ResponseEntity.ok("Xóa voucher thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa: " + e.getMessage());
        }
    }
}