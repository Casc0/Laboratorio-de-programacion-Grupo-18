import Panchitos.*;

import java.util.Random;

public class Panchero implements Runnable{

    @Override
    public void run() {
        Random random = new Random();
        Venta pancho = new Pancho(3, "Cliente");
        System.out.println("Panchero: Preparando un panchito...");

        while(random.nextInt() % 3 != 0){
            pancho = elegirTopping(pancho);
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println("Panchero: Panchito listo!\n");
        System.out.println("----------------------------");
        System.out.println(pancho.getTicket());
        System.out.println("Precio Final: " + pancho.getValor());
        System.out.println("---------------------------");
    }

    public Venta elegirTopping(Venta pancho){
        int ingrediente = new Random().nextInt(3);
        switch(ingrediente) {
            case 0:
                pancho = new Ketchup(pancho);
                break;
            case 1:
                pancho = new Mayonesa(pancho);
                break;
            case 2:
                pancho = new Papitas(pancho);
                break;
        }
        return pancho;
    }
}
