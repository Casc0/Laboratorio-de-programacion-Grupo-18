package Panchitos;

//El Base Decorator

public class Extra implements Venta{

    private double precio = 0;
    private Venta wrappee;

    public Extra(Venta unaVenta){
        this.wrappee = unaVenta;
        precio = unaVenta.getValor();
    }


    @Override
    public double getValor() {
        return wrappee.getValor();
    }

    @Override
    public String getTicket() {
        return wrappee.getTicket();
    }
}
