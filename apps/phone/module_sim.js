// Module quản lý SIM và kết nối mạng
export class QuanLySIM {
  constructor() {
    this.trangThai = 'CHUA_KICH_HOAT';
    this.soDienThoai = '';
    this.nhaMang = '';
    this.cuongDoTinHieu = 0;
  }

  kichHoatSIM(soDienThoai, nhaMang) {
    this.soDienThoai = soDienThoai;
    this.nhaMang = nhaMang;
    this.trangThai = 'SAN_SANG';
    this.kiemTraTinHieu();
  }

  async kiemTraTinHieu() {
    setInterval(() => {
      this.cuongDoTinHieu = Math.floor(Math.random() * 5) + 1;
    }, 5000);
  }

  goiDien(soGoi) {
    if (this.trangThai !== 'SAN_SANG') {
      throw new Error('SIM chưa kích hoạt');
    }
    return `Đang gọi ${soGoi}...`;
  }

  nhanTin(soNhan, noiDung) {
    if (this.trangThai !== 'SAN_SANG') {
      throw new Error('SIM chưa kích hoạt');
    }
    return `Đã gửi tin nhắn tới ${soNhan}`;
  }
}