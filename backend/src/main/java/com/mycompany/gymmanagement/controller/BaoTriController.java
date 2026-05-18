package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.BaoTri;
import com.mycompany.gymmanagement.service.BaoTriService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/baotri")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BaoTriController {
    private final BaoTriService baoTriService;

    @GetMapping
    public ResponseEntity<List<BaoTri>> layDanhSach() {
        return ResponseEntity.ok(baoTriService.layDanhSachBaoTri());
    }

    @PostMapping
    public ResponseEntity<String> themBaoTri(@RequestBody BaoTri bt) {
        try {
            baoTriService.themBaoTriMoi(bt);
            return ResponseEntity.ok("Thêm phiếu bảo trì thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatBaoTri(@PathVariable String id, @RequestBody Map<String, Object> payload) {
        try {
            BaoTri bt = new BaoTri();
            bt.setMaTB((String) payload.get("maTB"));
            bt.setNgayBaoTri(java.time.LocalDate.parse((String) payload.get("ngayBaoTri")));
            bt.setNoiDung((String) payload.get("noiDung"));
            bt.setChiPhi(Double.valueOf(payload.get("chiPhi").toString()));
            
            String tinhTrangMay = (String) payload.get("tinhTrangMay");
            
            baoTriService.capNhatBaoTri(id, bt, tinhTrangMay);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaBaoTri(@PathVariable String id) {
        try {
            baoTriService.xoaBaoTri(id);
            return ResponseEntity.ok("Xóa thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa: " + e.getMessage());
        }
    }
}