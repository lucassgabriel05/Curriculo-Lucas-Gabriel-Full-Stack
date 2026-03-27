window.onload = function() {
    const btn = document.getElementById('baixar-curriculo');
    const areaCurriculo = document.getElementById('caixa_principal');

    if (btn) {
        btn.addEventListener('click', function() {
            console.log("Iniciando geração do PDF...");

            // Usamos a sintaxe correta para a versão nova do jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'pt', 'a4');

            html2canvas(areaCurriculo, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                doc.save("Curriculo_Lucas_Gabriel_FullStack.pdf");
                console.log("PDF Gerado com sucesso!");
            }).catch(err => {
                console.error("Erro no html2canvas:", err);
            });
        });
    } else {
        console.error("Botão 'baixar-curriculo' não encontrado no HTML.");
    }

    const opcoes = {
        margin: [10, 10, 10, 10], 
        filename: 'Curriculo_Lucas_Gabriel.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 1.7,       // Diminui um pouco o tamanho para caber em 1 página no PC
            useCORS: true,    
            windowWidth: 900, // FORÇA o celular a renderizar como se fosse PC (evita cortes)
            scrollY: 0,       // Começa a captura do topo, mesmo se você deu scroll
            scrollX: 0
        },
        jsPDF: { 
            unit: 'pt', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    }
};