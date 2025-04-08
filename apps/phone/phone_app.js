import { GiaoDienPhone } from './giao_dien.js';

export class PhoneApp {
  constructor() {
    this.phoneUI = new GiaoDienPhone();
    this.phoneUI.sim.kichHoatSIM('0912345678', 'VIETTEL');
  }

  async khoiDong() {
    console.log('Ứng dụng điện thoại đã sẵn sàng');
    
    try {
      // Hiển thị màn hình chính
      console.log(await this.phoneUI.hienThiManHinhChinh());
      
      // Thêm liên hệ mẫu
      const contactResult = await this.phoneUI.themLienHe('Hỗ trợ', '18001008');
      console.log('Đã thêm liên hệ:', contactResult.contact);
      
      // Thử nghiệm gọi điện
      const callResult = await this.phoneUI.goiDien('0987654321');
      console.log('Kết quả gọi:', callResult);
      
      // Thử nghiệm nhắn tin
      const messageResult = await this.phoneUI.nhanTin(
        '0987654321', 
        'Xin chào từ hệ điều hành lượng tử'
      );
      console.log('Kết quả nhắn tin:', messageResult);

      // Tối ưu hóa
      this.phoneUI.optimize();
      console.log('Đã tối ưu hóa ứng dụng');

    } catch (error) {
      console.error('Lỗi khi khởi động ứng dụng:', error);
    }
  }
}
