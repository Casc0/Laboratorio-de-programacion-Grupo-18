import java.util.Random;

public class Panchero implements Runnable{

    @Override
    public void run() {

    }

    public Object elegirTopping(Pancho pancho){
        int ingrediente = new Random().nextInt(3);
        switch(ingrediente) {
            case 0:
                pancho = new PanchoMostaza(pancho);
                break;
            case 1:
                pancho = new PanchoKetchup(pancho);
                break;
            case 2:
                pancho = new PanchoMayonesa(pancho);
                break;
        }
        return pancho;
    }
}
